import styled from "styled-components"

export const Typography = styled.div`
text-align: center;
text-decoration: dashed;
`
export const Row = styled.div`
display: grid;
grid-auto-columns: minmax(auto, 1fr);
align-items: center;
 grid-template-areas: ${({imgStart})=>(imgStart ? `'col2 col1'` :`'col1 col2'`)}; 
@media screen and (max-width:768px) {
     grid-template-areas: ${({imgStart})=>(imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)}  
}
`

export const Col = styled.div`

`
export const Statistic = styled.div`

`