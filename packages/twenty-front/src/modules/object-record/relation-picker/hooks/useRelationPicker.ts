import { useRecoilState } from 'recoil';

import { useRelationPickerScopedStates } from '@/object-record/relation-picker/hooks/internal/useRelationPickerScopedStates';
import { RelationPickerScopeInternalContext } from '@/object-record/relation-picker/scopes/scope-internal-context/RelationPickerScopeInternalContext';
import { useAvailableScopeIdOrThrow } from '@/ui/utilities/recoil-scope/scopes-internal/hooks/useAvailableScopeId';

type useRelationPickeProps = {
  relationPickerScopeId?: string;
};

export const useRelationPicker = (props?: useRelationPickeProps) => {
  const scopeId = useAvailableScopeIdOrThrow(
    RelationPickerScopeInternalContext,
    props?.relationPickerScopeId,
  );

  const {
    identifiersMapperState,
    searchQueryState,
    relationPickerSearchFilterState,
    relationPickerPreselectedIdState,
  } = useRelationPickerScopedStates({
    relationPickerScopedId: scopeId,
  });

  const [identifiersMapper, setIdentifiersMapper] = useRecoilState(
    identifiersMapperState,
  );

  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const [relationPickerSearchFilter, setRelationPickerSearchFilter] =
    useRecoilState(relationPickerSearchFilterState);

  const [relationPickerPreselectedId, setRelationPickerPreselectedId] =
    useRecoilState(relationPickerPreselectedIdState);

  return {
    scopeId,
    identifiersMapper,
    setIdentifiersMapper,
    searchQuery,
    setSearchQuery,
    relationPickerSearchFilter,
    setRelationPickerSearchFilter,
    relationPickerPreselectedId,
    setRelationPickerPreselectedId,
  };
};
