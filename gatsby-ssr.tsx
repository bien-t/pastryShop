import React from "react";
import type { GatsbySSR } from "gatsby";
import Layout from './src/components/Layout'
import {BasketProvider} from './src/utils/basketContext'

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
  element,
}) => {
  return (
    <Layout>{element}</Layout>
  )
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] =({ element })=> {
  return <BasketProvider>{element}</BasketProvider>;
}
