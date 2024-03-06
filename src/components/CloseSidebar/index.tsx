import { styled } from 'styled-components';

const CloseSidebarWrap = styled.div`
  position: relative;

  > div {
    width: 10px;
    height: 30px;
    background-color: gray;
  }
  .bar-one {
  }
`;

const CloseSidebar = () => {
  return (
    <CloseSidebarWrap>
      <div className="bar-one"></div>
      <div className="bar-two"></div>
    </CloseSidebarWrap>
  );
};

export default CloseSidebar;
