import { styled } from 'styled-components';
import Image from 'next/image';
import { FC } from 'react';

const CategoryItemWrap = styled.div<{ $active: boolean }>`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.$active ? 'plum' : '#008c8c')};
  font-size: 15px;
  border-radius: 7px;

  .icon-category {
    width: 21px;
    height: 21px;
  }
`;

interface IProps {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}
const CategoryItem: FC<IProps> = (props) => {
  return (
    <CategoryItemWrap onClick={props.onClick} $active={props.active}>
      <div className="flex-center">
        <Image className="icon-category" src={require('@img/icon-category.svg')} alt="" />
        <div className="ml-10">{props.name}</div>
      </div>
      <div>{props.count}</div>
    </CategoryItemWrap>
  );
};

export default CategoryItem;
