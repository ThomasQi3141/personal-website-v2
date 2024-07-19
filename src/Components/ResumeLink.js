import styled from "styled-components";

const ResumeLink = styled.a.attrs((props) => ({
  href: props.href || "#",
  target: "_blank",
}))`
  color: ${(props) => props.textColor};
  font-size: 1.5rem;
  text-decoration: underline;
  cursor: pointer;
`;

export default ResumeLink;
