import { graphql, HeadFC } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import ProductShort from "../components/ProductShort";
import useBasket from "../utils/useBasket";

const MenuStyles = styled.section`
    margin: 0 auto 1rem auto;
    width:70%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
    grid-auto-rows: 250px;
    gap: 1rem;
`;

const HeadingStyles = styled.h2`
    font-size: 5rem;
    color: #b3184d;
    text-align: center;
    margin-bottom: 0;
`
const ParagraphStyles = styled.p`
    text-align: center;
    font-size: 2rem;
    margin-top: 0;
    font-family: FrenchFont;

`


export interface CmsProduct {
    name: string
    tags: [string]
    price: number
    productphoto: {
        gatsbyImageData?: IGatsbyImageData
        responsiveImage?: {
            src:string
        }
    }
    description: string
    slug: string
}

function Menu({ data: { allProducts: { nodes: products } } }: { data: { allProducts: { nodes: CmsProduct[] } } }) {

    const {addToBasket} = useBasket();
    return (
        <>
            <HeadingStyles>Our delicacies</HeadingStyles>
            <ParagraphStyles>Click on the photo to read more...</ParagraphStyles>
            <MenuStyles>

                {products.map((product) => {
                    return <ProductShort product={product} key={product.slug} addToBasket={addToBasket}/>
                })}

            </MenuStyles>
        </>

    )

}

export const query = graphql`
    query {
        allProducts: 
        allDatoCmsProduct {
            nodes {
                name
                tags
                price
                productphoto {
                    gatsbyImageData(width:200)
                }
                description
                slug
            }
        }
    }
`

export default Menu;
export const Head: HeadFC = () => <title>Menu page</title>
