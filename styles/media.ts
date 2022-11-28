import { css, FlattenSimpleInterpolation } from "styled-components";

// tslint:disable-next-line: variable-name
const mobile_break_max: number = 767; // 모바일 최대
// tslint:disable-next-line: variable-name
const tablet_break_min: number = mobile_break_max + 1; // 태블릿 최소
// tslint:disable-next-line: variable-name
const tablet_break_max: number = 1024; // 태블릿 최대
// tslint:disable-next-line: variable-name
const desktop_break_min: number = tablet_break_max + 1; // 데스크탑 최소

const desktop = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media (min-width: ${desktop_break_min}px) {
      ${styles};
    }
  `;
};

const tablet = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media (min-width: ${tablet_break_min}px) and (max-width: ${tablet_break_max}px) {
      ${styles}
    }
  `;
};

const tabletUnder = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media screen and (max-width: ${desktop_break_min}px) {
      ${styles}
    }
  `;
};

const mobile = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media screen and (max-width: ${mobile_break_max}px) {
      ${styles}
    }
  `;
};

const mobileOver = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media screen and (min-width: ${tablet_break_min}px) {
      ${styles}
    }
  `;
};

const portrait = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media screen and (orientation: portrait) {
      ${styles}
    }
  `;
};

const landscape = (styles: FlattenSimpleInterpolation) => {
  return css`
    @media screen and (orientation: landscape) {
      ${styles}
    }
  `;
};

export {
  desktop,
  mobile,
  tablet,
  mobileOver,
  tabletUnder,
  portrait,
  landscape,
};
