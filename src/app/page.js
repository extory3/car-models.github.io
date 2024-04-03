"use client";
import styles from "./page.module.css";
import {Button, Center, Group, Loader, Table, Tabs} from "@mantine/core";
import {useEffect, useState} from "react";
import {apiURL} from "@/app/api/api";

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
  useEffect(()=>{
      const fetchData = async () => {
          setIsLoading(true);
          await fetch(`${apiURL}/catalog/datasets/all-vehicles-model/records?select=model%2Cyear&limit=100&refine=make%3A%22${selectModel ? selectModel : "Volvo"}%22`)
              .then((res) => res.json())
              .then((data) => {
                  setListCar(data.results);
                  setIsLoading(false);
              })
      }
      fetchData();
  },[selectModel])

  return (
    <main className={styles.main}>
        <Tabs value={selectModel} onChange={setModel} style={{width:"100%"}}>
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
                                        !listCar ? null : listCar.map((el,i) =>{
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

    </main>
  );
}
