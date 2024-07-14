import { css } from 'hono/css';
import { FC } from 'hono/jsx';

import { Layout } from './Layout';
import { barahkhadi } from './utils';



const container = css`
  display:grid;
  grid-gap: 4px;
  grid-template-columns: repeat(5,1fr);
`

const letterClass = css`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows:1fr minmax(4px, max-content);
  justify-items: center;
  align-content: center;
  color: white;
  background-color: hwb(10 10% 60%);
  font-size: 2rem;
  border:2px solid grey;
  border-radius: 0.5rem;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  padding-block: 0.5rem;
  & p {
    font-size: 4rem;
    margin: 0;
    padding:0;
    & :last-child{
      font-size: 0.5rem;
    }
  }
}
`

type LetterBase = {
  code: number;
  letter: string;
}

type LetterProps = {
  item: LetterBase;
}

type AlphabetProps = {
  title?: string;
  list: LetterBase[];
}

export const Letter: FC<any> = ({ item }) => (
  <div class={letterClass}>
    <p>{item}</p>
  </div>
);


// MARK: JSX Support
const Barahkhadi: FC<any> = ( {what} ) => (<Layout>
    <div class={container}>
      {barahkhadi(what).map(l => <Letter item={l} />)}
    </div>
  </Layout>
);


export { Barahkhadi }