import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: #ffffff;
  width: 100%;
  margin: 0 120;
  box-sizing: border-box;

  @media (max-width: 768px) {
    background: #f4f5f6;
  }
`;

export const HeaderBlock = styled.div`
  height: 70px;
  width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;

  & > * {
    flex: 0 0 auto;
  }
`;

export const ButtonsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;

  & > * {
    flex: 0 0 auto;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
`;
export const HeaderLeft = styled.div`
  display: flex;
`;

export const HeaderRight = styled.div`
  display: flex;
`;

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  margin-right: 16vw;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
    gap: 8px;

    .desktop-only {
      display: none;
    }
  }
`;

export const HeaderButton = styled.button`
  width: 128px;
  background-color: transparent;
  border: none;
  color: black;
   color: ${({ $active }) => ($active ? "#7334EA" : "black")};
  border-bottom: ${({ $active }) => ($active ? "1px solid #7334EA" : "none")};
  text-decoration: none;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;
  line-height: 170%;
  text-align: center;
  gap: 48px;

  .arrow {
    font-size: 10px;
    transform: translateY(-1px);
    display: none;
  }

  &:hover {
    color:#7334EA ;
    border-bottom: 1px solid #7334EA;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    margin-left: 65px;

    .arrow {
      display: inline;
    }
  }
`;
export const LogoutButton = styled(HeaderButton)`
  font-weight: 600;
  font-size: 14px;
  line-height: 170%;
  text-align: center;
  gap: 48px;

  .arrow {
    font-size: 10px;
    transform: translateY(-1px);
    display: none;
  }

  &:hover {
    color: #7334EA;
    border-bottom: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    margin-left: 65px;

    .arrow {
      display: inline;
    }
  }
`;

export const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 10px 16px;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    color: #7334EA;
    border-bottom: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 8px;
  width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;
