import * as React from "react"
import { HeadFC } from "gatsby"
import styled from "styled-components"
import { CmsProduct } from "./menu"
import ProductShort from "../components/ProductShort"
import useBasket from "../utils/useBasket"



const HomeStyles = styled.div`
  width: 70%;  
  margin: 0 auto;
  button {
    font-size: 2rem;
  }

`
const H3Styles = styled.h3 `
  color: #b3184d;
  text-align: center;
  font-size: 3.5rem;
`

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
const ProductsStyles = styled.div`
    margin: 0 auto;
    width:70%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
    grid-auto-rows: 350px;
    row-gap: 1rem;
    @media (max-width:700px){
      grid-auto-rows: 200px;
    }
`;



function Home() {
  const [fetchData, setFetchData] = React.useState<CmsProduct[]>();
  const {addToBasket} = useBasket();
  React.useEffect(() => {

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.GATSBY_DATOCMS_API}`,
      },
      body: JSON.stringify({
        query: `query {
          allProducts(orderBy: _createdAt_DESC, first: "3") {
            name
            tags
            price
            productphoto {
              id
              responsiveImage(imgixParams: {w: "500" h:"300"}) {
                src
              }
            }
            description
            slug
          }
        }
      `})
    })
      .then((response => response.json()))
      .then((response) => {
        setFetchData(response?.data?.allProducts)
      })
  }, [])
  return (
    <HomeStyles>
      <HeadingStyles>Welcome to our shop</HeadingStyles>
      <ParagraphStyles>Thank you for visiting us. We hope our products will pique your interest and allow us to fulfill your sweet desires. </ParagraphStyles>
      <ParagraphStyles>We are open from Monday to Friday from 8am - 4pm</ParagraphStyles>
      <H3Styles>Our Newest Creations</H3Styles>
      <ProductsStyles>
        {fetchData &&
          fetchData.map((product) => {
            return <ProductShort product={product} key={product.slug} addToBasket={()=>addToBasket(product)} />
          })

        }
      </ProductsStyles>
    </HomeStyles>
  )
}

export default Home

export const Head: HeadFC = () => <title>Home Page</title>
