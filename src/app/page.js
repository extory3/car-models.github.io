"use client";
import styles from "./page.module.css";
import {Button, Center, Group, Loader, Pagination, Table, Tabs} from "@mantine/core";
import {useEffect, useState} from "react";
import {apiURL} from "@/app/api/api";
require('dotenv').config()
const carModels = [
    {
        "id":0,
        "name":"Volvo"
    },
    {
        "id": 1,
        "name":"Ford"
    }]
export default function Home() {
  const [selectModel,setModel] = useState(carModels[0].name);
  const [listCar, setListCar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfResults,setNumOfResults] = useState(0);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(15);
  const [tournament, setTournament] = useState(null);

    useEffect(() => {
        const getTournaments = async () => {
            await fetch(process.env.API_URL,{mode:"no-cors"})
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
        }
        getTournaments();
    }, []);

  useEffect(()=>{
      // console.log(process.env.NEXT_PUBLIC_API_URL)

      const fetchData = async () => {
          setIsLoading(true);
          await fetch(`${apiURL}/catalog/datasets/all-vehicles-model/records?select=model&group_by=model&limit=200&offset=0&refine=make%3A%22${selectModel ? selectModel : "Volvo"}%22`)
              .then((res) => res.json())
              .then((data) => {
                  setNumOfResults(data.results.length);
                  setListCar(data.results);
                  setIsLoading(false);
              })
      }
      fetchData();
  },[selectModel])



  return (
    <main className={styles.main}>
        Кол-во результатов: {numOfResults}
        <Tabs value={selectModel} onChange={(value) => {
            setModel(value);
            if(page < numOfResults / pageSize)
                return setPage(1);
        }} style={{width:"100%"}}>
            <Tabs.List>
                {
                    carModels.map((el,i) =>{
                        return(
                            <Tabs.Tab value={el.name}>{el.name}</Tabs.Tab>
                        )
                    })
                }
            </Tabs.List>


            {
                isLoading ? <Center h={100}><Loader size={30}/></Center>  :
                carModels.map((el,i) =>{
                    return(
                        <Tabs.Panel value={el.name}>
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Модель</Table.Th>
                                        <Table.Th>Год</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {
                                        !listCar ? null : listCar.slice(pageSize * (page - 1),pageSize * page).map((el,i) =>{
                                            return(
                                                <Table.Tr key={i}>
                                                    <Table.Td>{el.model}</Table.Td>
                                                    <Table.Td>{el.year}</Table.Td>
                                                </Table.Tr>
                                            )
                                        })
                                    }
                                </Table.Tbody>
                            </Table>
                        </Tabs.Panel>
                    )
                })
            }
        </Tabs>
        <Pagination value={page} total={numOfResults / pageSize} onChange={setPage}/>
    </main>
  );
}

