import PropTypes from "prop-types";
import styled from "styled-components";

const HeaderLogoStyle = styled.div`
  a {
    display: block;
  }
`;

const LogoImage = styled.img`
  width: 144px;
  height: 19px;

  @media (max-width: 768px) {
    width: 120px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 109px;
    height: 14px;
  }
`;

function HeaderLogo({ logo }) {
  return (
    <HeaderLogoStyle>
      <a href="/" target="_self">
        <LogoImage src={logo} alt="logo" />
      </a>
    </HeaderLogoStyle>
  );
}

HeaderLogo.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default HeaderLogo;
