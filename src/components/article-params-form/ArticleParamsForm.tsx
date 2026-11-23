import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  defaultArticleState,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  fontFamilyOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent, JSX } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setPageStyle: (pageStyle: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  setPageStyle,
}: ArticleParamsFormProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formValues, setFormValues] = useState<ArticleStateType>(defaultArticleState);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickClose({
    isOpen: isMenuOpen,
    onChange: setIsMenuOpen,
    rootRef: modalRef,
  });

  const handleToggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleChange =
    (optionType: keyof ArticleStateType) =>
    (data: OptionType): void => {
      setFormValues((prevState) => ({
        ...prevState,
        [optionType]: data,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setPageStyle(formValues);
    setIsMenuOpen(false);
  };

  const handleReset = (): void => {
    setFormValues(defaultArticleState);
    setPageStyle(defaultArticleState);
  };

  return (
    <div ref={modalRef}>
      <ArrowButton isOpen={isMenuOpen} onClick={handleToggleMenu} />
      <aside className={clsx(styles.container, isMenuOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formValues.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={formValues.fontSizeOption}
            title="Размер шрифта"
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            selected={formValues.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formValues.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            selected={formValues.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="clear" htmlType="reset" />
            <Button title="Применить" type="apply" htmlType="submit" />
          </div>
        </form>
      </aside>
    </div>
  );
};
