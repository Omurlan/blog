import React from 'react';
import appRoutes, { methodColors, MethodsType } from './routesData';

const styles = {
  page: {
    maxWidth: 1000,
    margin: '20px auto',
    padding: 15,
  },
  title: {
    fontWeight: 500,
    marginBottom: 10,
    borderBottom: '1px solid #ccc',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  item: (method: MethodsType) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    padding: 5,
    backgroundColor: methodColors[method] + '0D', // hex alpha value 5%
    border: `1px solid ${methodColors[method]}`,
    borderRadius: 4,
  }),
  method: (method: MethodsType) => ({
    fontWeight: 500,
    color: 'white',
    padding: '4px 0',
    textAlign: 'center',
    fontSize: 13,
    minWidth: 60,
    backgroundColor: methodColors[method],
    borderRadius: 4,
  }),
  path: {
    fontWeight: 500,
  },
};

const Routes = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Routes</h1>

      <ul style={styles.list}>
        {appRoutes.map((route) => (
          <li key={route.path} style={styles.item(route.method)}>
            <span style={styles.method(route.method)}>{route.method}</span>
            <p style={styles.path}>{route.path}</p>
            <p>{route.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routes;
