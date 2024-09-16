// import React from 'react';
//   import styles from '../styles/layout.module.css'

//   export default function Layout(props) {
//     return (
//       <div className={styles.layout}>
//         {props.children}
//       </div>
//     )
//   }
import React from 'react';
import styles from '../styles/layout.module.css';
import { Analytics } from "@vercel/analytics/react";

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      {props.children}
      <Analytics /> {/* Añadir Analytics aquí */}
    </div>
  );
}
