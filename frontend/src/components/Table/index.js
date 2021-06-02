import React, { useEffect, useState } from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import api from '../../services/api'


const tableHead = {
    RazaoSocial: "Nome",
    Telefone1: "Telefone 1",
    Telefone1Contato: "Contato 1",
    Telefone2: "Telefone 2",
    Telefone2Contato: "Contato 2",
    Email: "Email"
  };


export default function Table(){
    const [people, setPeople] = useState([])
    
    useEffect(() => {
        async function loadPeople(){
            const response = await api.get('/')
            const data = response.data
            if (data) setPeople(data)
        }
        loadPeople()
    }, [])


  const countPerPage = 10;
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [collection, setCollection] = useState(
    cloneDeep(people.slice(0, countPerPage))
  );
  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        people
          .filter(item => item.RazaoSocial.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );



  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(people.slice(from, to)));
  };


  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };


    return (
        <>
        <div className="search">
          <input
            placeholder="Search Campaign"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className="trhover">{tableData()}</tbody>
        </table>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={people.length}
        />
      </>
    )

}