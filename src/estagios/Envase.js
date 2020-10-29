import React, { useState, useEffect } from 'react';
import { Panel, Button, Table } from 'rsuite'
import { useInterval, random } from './utils'

export const Envase = ({ start }) => {

    const { Column, HeaderCell, Cell } = Table;

    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(false)

    const [robo1, setRobo1] = useState(false)
    const [robo2, setRobo2] = useState(false)
    const [robo3, setRobo3] = useState(false)

    const [bottles, setBottles] = useState(0)
    const [boxes, setBoxes] = useState(0)

    const [data, setData] = useState([
        { Robo: 1, Acao: 'Pegar garrafa vazia', Tempo: 0.5 },
        { Robo: 1, Acao: 'Movimento ate a esteira', Tempo: 3.2 },
        { Robo: 1, Acao: 'Soltar garrafa na esteira', Tempo: 0.6 },
        { Robo: 1, Acao: 'Movimento de volta', Tempo: 2.1 },
        { Robo: 2, Acao: 'Pegar garrafa da esteira', Tempo: 1.0 },
        { Robo: 2, Acao: 'Movimento ate a caixa', Tempo: 5.8 },
        { Robo: 2, Acao: 'Soltar garrafa na caixa', Tempo: 0.9 },
        { Robo: 2, Acao: 'Movimento ate a esteira', Tempo: 2.0 },
        { Robo: 3, Acao: 'Pegar caixa', Tempo: 1.1 },
        { Robo: 3, Acao: 'Movimento ate o pallet', Tempo: 6.6 },
        { Robo: 3, Acao: 'Soltar caixa no pallet', Tempo: 2.3 },
        { Robo: 3, Acao: 'Movimento de volta', Tempo: 5.0 }
    ])

    useEffect(() => {
        setRunning(start)
    }, [start])

    useInterval(() => {
        if (running) {
            setTime(time + 1)

            if (time % 2 === 0) {
                setRobo1(true)

                let newData = data
                newData[0].Tempo = random(0.5, 0.5, 3)
                newData[1].Tempo = random(3.2, 0.5, 3)
                newData[2].Tempo = random(0.6, 0.5, 3)
                newData[3].Tempo = random(2.1, 0.5, 3)
                setData(newData)
            } else {
                setRobo1(false)
            }

            if (time % 2 !== 0) {
                setRobo2(true)
                let newData = data
                newData[4].Tempo = random(1.0, 0.5, 3)
                newData[5].Tempo = random(5.8, 0.5, 3)
                newData[6].Tempo = random(0.9, 0.5, 3)
                newData[7].Tempo = random(2.0, 0.5, 3)
                setData(newData)

                setBottles(bottles + 1)
            } else {
                setRobo2(false)
            }

            if (robo3 === true && bottles === 3) {
                setRobo3(false)
            }

            if (bottles === 6) {
                setRobo3(true)
                setBottles(0)
                setBoxes(boxes + 1)

                let newData = data
                newData[8].Tempo = random(1.1, 0.5, 3)
                newData[9].Tempo = random(6.6, 0.5, 3)
                newData[10].Tempo = random(2.3, 0.5, 3)
                newData[11].Tempo = random(5.0, 0.5, 3)
                setData(newData)
            }

            if (time === 108) {
                setRobo1(false)
                setRobo2(false)

                setRunning(false)
            }
        }

        if (robo3 && !running) setRobo3(false)
    }, 1000);

    return (
        <Panel header="Envase" bordered>
            <span>Robo 1:</span>
            <Button appearance="ghost" color={robo1 ? 'green' : 'red'}> {robo1 ? 'Em movimento' : 'Parado'} </Button>
            <br />
            <br />
            <span>Robo 2:</span>
            <Button appearance="ghost" color={robo2 ? 'green' : 'red'}> {robo2 ? 'Em movimento' : 'Parado'} </Button>
            <br />
            <br />
            <span>Robo 3:</span>
            <Button appearance="ghost" color={robo3 ? 'green' : 'red'}> {robo3 ? 'Em movimento' : 'Parado'} </Button>
            <br />
            <br />
            <span>Garrafas cheias: {bottles}</span>
            <span>Caixas cheias: {boxes}</span>
            <br />
            <br />
            <span>Esteira:</span>
            <Button appearance="ghost" color={running ? 'green' : 'red'}> {running ? 'Ligado' : 'Desligado'} </Button>
            <br />
            <br />
            <Table height={600} data={data}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>Robo</HeaderCell>
                    <Cell dataKey="Robo" />
                </Column>
                <Column width={250} fixed>
                    <HeaderCell>Acao</HeaderCell>
                    <Cell dataKey="Acao" />
                </Column>
                <Column width={100} fixed>
                    <HeaderCell>Tempo [s]</HeaderCell>
                    <Cell dataKey="Tempo" />
                </Column>
            </Table>
        </Panel>
    );
}