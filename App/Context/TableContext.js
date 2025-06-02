import React, { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <TableContext.Provider value={{ selectedTable, setSelectedTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext); 