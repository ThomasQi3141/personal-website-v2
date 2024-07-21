import styled from "styled-components";
import { Link } from "react-router-dom";

const PongButton = styled(Link)`
  color: ${(props) => props.textColor};
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 0 auto;
`;

export default PongButton;
