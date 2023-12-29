import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useViewBar } from '@/views/hooks/useViewBar';
import { GraphQLView } from '@/views/types/GraphQLView';
import { isDeeplyEqual } from '~/utils/isDeeplyEqual';

import { useViewScopedStates } from '../hooks/internal/useViewScopedStates';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

export const ViewBarEffect = () => {
  const {
    loadView,
    changeViewInUrl,
    loadViewFields,
    loadViewFilters,
    loadViewSorts,
  } = useViewBar();

  const [searchParams] = useSearchParams();
  const currentViewIdFromUrl = searchParams.get('view');

  const {
    viewTypeState,
    viewObjectMetadataIdState,
    viewsState,
    currentViewIdState,
  } = useViewScopedStates();

  const [views, setViews] = useRecoilState(viewsState);
  const viewType = useRecoilValue(viewTypeState);
  const viewObjectMetadataId = useRecoilValue(viewObjectMetadataIdState);
  const setCurrentViewId = useSetRecoilState(currentViewIdState);

  const { records: newViews } = useFindManyRecords<GraphQLView>({
    skip: !viewObjectMetadataId,
    objectNameSingular: CoreObjectNameSingular.View,
    filter: {
      type: { eq: viewType },
      objectMetadataId: { eq: viewObjectMetadataId },
    },
  });

  useEffect(() => {
    if (!newViews.length) return;

    if (!isDeeplyEqual(views, newViews)) {
      setViews(newViews);
    }

    const currentView =
      newViews.find((view) => view.id === currentViewIdFromUrl) ??
      newViews[0] ??
      null;

    if (!currentView) return;

    setCurrentViewId(currentView.id);

    if (currentView?.viewFields) {
      loadViewFields(currentView.viewFields, currentView.id);
      loadViewFilters(currentView.viewFilters, currentView.id);
      loadViewSorts(currentView.viewSorts, currentView.id);
    }

    if (!currentViewIdFromUrl) return changeViewInUrl(currentView.id);
  }, [
    changeViewInUrl,
    currentViewIdFromUrl,
    loadViewFields,
    loadViewFilters,
    loadViewSorts,
    newViews,
    setCurrentViewId,
    setViews,
    views,
  ]);

  useEffect(() => {
    if (!currentViewIdFromUrl) return;

    loadView(currentViewIdFromUrl);
  }, [currentViewIdFromUrl, loadView]);

  return <></>;
};
