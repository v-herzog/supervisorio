import React, { useState } from 'react';
import { Panel, Progress, IconButton, Icon, Button } from 'rsuite'
import { useInterval, random } from './utils'

export const Moagem = ({ onFinish }) => {

    const DURACAO = 60
    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [moagem, setMoagem] = useState(0)
    const [running, setRunning] = useState(false)

    const [motor, setMotor] = useState(false)
    const [fuso, setFuso] = useState(false)

    const [estoque, setEstoque] = useState('Estoque')

    const tripToStock = () => {
        setEstoque('Em transito')
        setTimeout(() => setEstoque('Moagem'), random(4000, 0.1, 3))
        setTimeout(() => start(), random(4500, 0.1, 3))
        setTimeout(() => setEstoque('Em transito'), random(6000, 0.1, 3))
        setTimeout(() => setEstoque('Estoque'), random(10000, 0.1, 3))
    }

    const start = () => {
        setRunning(true)
        setMoagem(0)
        setMotor(true)
        setFuso(true)
    }

    const finish = () => {
        setMoagem(0)
        setTime(0)
        onFinish(true)
    }

    useInterval(() => {
        if (running) {
            setTime(time + 1)

            setMoagem(Math.min(time, 100))

            if (moagem === 80) {
                setMotor(false)
            }

            if (moagem === 100) {
                setRunning(false)
                setFuso(false)
            }
        }
    }, 100);

    return (
        <Panel header="Moagem" bordered>
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={moagem === 0 ? 'yellow' : null}
                onClick={tripToStock}
                disabled={moagem !== 0}
                block>
                Entrar com Malte
            </IconButton>
            <br />
            <Button appearance="ghost" color='yellow' block>{estoque}</Button>
            <br />
            <span>Progresso ({parseInt(moagem / 100 * DURACAO)}min de {DURACAO}min)</span>
            <Line percent={moagem} status={moagem === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Motor</span>
            <Button appearance="ghost" color={motor ? 'green' : 'red'}> {motor ? 'Ligado' : 'Desligado'} </Button>
            <br />
            <br />
            <span>Fuso</span>
            <Button appearance="ghost" color={fuso ? 'green' : 'red'}> {fuso ? 'Ligado' : 'Desligado'}</Button>
            <br />
            <br />
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={moagem === 100 ? 'green' : null}
                onClick={finish}
                disabled={moagem !== 100}
                block>
                Valvula para tanque de Mostura
            </IconButton>
        </Panel>
    );
}