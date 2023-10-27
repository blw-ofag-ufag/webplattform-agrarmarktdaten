const debugStyles =
  process.env.NODE_ENV === "production"
    ? ""
    : `
          .debug .MuiTypography-root {
            border: 1px solid hotpink;
            position: relative;
            box-sizing: border-box;
          }

          .debug .MuiTypography-root:after {
            position: absolute;
            top: 0;
            right: 0;
            background: hotpink;
            color: black;
            font-size: 10px;
            padding: 0;
            line-height: 1.25;
          }

          .debug-warn .MuiTypography-root {
            border-color: gold;
          }

          .debug-warn .MuiTypography-root:after {
            background: gold;
          }

          .debug .MuiTypography-body1:after {
            content: 'body1';
          }
          .debug .MuiTypography-body2:after {
            content: 'body2';
          }
          .debug .MuiTypography-body3:after {
            content: 'body3';
          }
          .debug .MuiTypography-h1:after {
            content: 'h1';
          }
          .debug .MuiTypography-h2:after {
            content: 'h2';
          }
          .debug .MuiTypography-h3:after {
            content: 'h3';
          }
          .debug .MuiTypography-h4:after {
            content: 'h4';
          }
          .debug .MuiTypography-h5:after {
            content: 'h5';
          }
          .debug .MuiTypography-h6:after {
            content: 'h6';
          }
          .debug .MuiTypography-display1:after {
            content: 'display1';
          }
          .debug .MuiTypography-display2:after {
            content: 'display2';
          }
          .debug .MuiTypography-tag:after {
            content: 'tag';
          }

          .debug [data-debug-good] {
            border-color: #50C878;
          }
          .debug [data-debug-good]:after {
            background: #50C878;
          }
`;

export default debugStyles;
