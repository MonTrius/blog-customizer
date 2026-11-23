import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [pageStyle, setPageStyle] = useState(defaultArticleState);
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': pageStyle.fontFamilyOption.value,
          '--font-size': pageStyle.fontSizeOption.value,
          '--font-color': pageStyle.fontColor.value,
          '--container-width': pageStyle.contentWidth.value,
          '--bg-color': pageStyle.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm setPageStyle={setPageStyle} />
      <Article />
    </main>
  );
};
