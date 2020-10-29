import React, { useState, useEffect } from 'react';
import { Panel, Progress, IconButton, Icon, Button, Slider } from 'rsuite'
import { useInterval, random, interpolation } from './utils'

export const Fervura = ({ start, onFinish }) => {

    const DURACAO = 60
    const TEMP_INICIAL = 100.0
    const ROTACAO_INICIAL = 60.0

    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [fervura, setFervura] = useState(0)
    const [running, setRunning] = useState(false)

    const [sliderRotacao, setSliderRotacao] = useState(ROTACAO_INICIAL)
    const [estoque, setEstoque] = useState('Estoque')

    const [temperatura, setTemperatura] = useState(TEMP_INICIAL)
    const [rotacao, setRotacao] = useState(ROTACAO_INICIAL)
    const [ph, setPH] = useState(6.5)

    useEffect(() => {
        if (start) tripToStock()
    }, [start])

    const tripToStock = () => {
        setEstoque('Em transito')
        setTimeout(() => setEstoque('Fervura'), random(4500, 0.1, 3))
        setTimeout(() => setRunning(true), random(5000, 0.1, 3))
        setTimeout(() => setEstoque('Em transito'), random(7000, 0.1, 3))
        setTimeout(() => setEstoque('Estoque'), random(11000, 0.1, 3))
    }

    const finish = () => {
        setFervura(0)
        setTime(0)
        onFinish(true)
    }

    useInterval(() => {
        if (running) {
            setTime(time + 0.5)

            setFervura(parseInt(Math.min(time, 100)))

            if (time % 1 === 0) {
                setRotacao(
                    random(sliderRotacao, 0.09, 4)
                )
                setTemperatura(
                    interpolation(0, ROTACAO_INICIAL, 80, 100, rotacao)
                )
                setPH(
                    interpolation(0, ROTACAO_INICIAL, 6.0, 6.5, rotacao)
                )
            }

            if (fervura === 100) {
                setRunning(false)
            }
        }
    }, 100);

    return (
        <Panel header="Fervura" bordered>
            <Button appearance="ghost" color='yellow' block>{estoque}</Button>
            <br />
            <span>Progresso ({parseInt(fervura / 100 * DURACAO)}min de {DURACAO}min)</span>
            <Line percent={fervura} status={fervura === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Velocidade de rotacao</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={60}
                max={120}
                onChange={value => setSliderRotacao(value)}
            />
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${rotacao} RPM` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Temperatura da fervura</span>
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${temperatura} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>pH</span>
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${ph}` : 'Sem leitura'}</Button>
            <br />
            <br />
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={fervura === 100 ? 'green' : null}
                onClick={finish}
                disabled={fervura !== 100}
                block>
                Valvula para tanque de Whirpool
            </IconButton>
        </Panel>
    );
}