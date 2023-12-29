import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { useEffect, useState } from 'react';
import { API } from '@stoplight/elements';
import Playground from '../components/playground';
import spotlightTheme from '!css-loader!@stoplight/elements/styles.min.css';


const RestApiComponent = ({openApiJson}) => {

  // We load spotlightTheme style using useEffect as it breaks remaining docs style
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = spotlightTheme.toString();
    document.head.append(styleElement);

    return () => styleElement.remove();
  }, []);

  return (
    <API
      apiDescriptionDocument={JSON.stringify(openApiJson)}
      router="hash"
    />
  )
}

const restApi = () => {
  const [openApiJson, setOpenApiJson] = useState({})

  const children = <RestApiComponent openApiJson={openApiJson} />

  return (
    <Layout
      title="REST API Playground"
      description="REST API Playground for Twenty"
    >
      <BrowserOnly>{
        () => <Playground
          children={children}
          setOpenApiJson={setOpenApiJson}
        />
      }</BrowserOnly>
    </Layout>
  )
};

export default restApi;
