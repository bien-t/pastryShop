import React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from './src/components/Layout'
import {BasketProvider} from './src/utils/basketContext'

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <Layout>{element}</Layout>
  )
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] =({ element })=> {
  return <BasketProvider>{element}</BasketProvider>;
}
