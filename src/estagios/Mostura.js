import React, { useState, useEffect } from 'react';
import { Panel, Progress, IconButton, Icon, Button, Slider } from 'rsuite'
import { useInterval, random, interpolation } from './utils'

export const Mostura = ({ start, onFinish }) => {

    const DURACAO = 80
    const TEMP_INICIAL = 40.0
    const ROTACAO_INICIAL = 60.0

    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [mostura, setMostura] = useState(0)
    const [running, setRunning] = useState(false)

    const [sliderAgua, setSliderAgua] = useState(TEMP_INICIAL)
    const [sliderRotacao, setSliderRotacao] = useState(ROTACAO_INICIAL)

    const [agua, setAgua] = useState(TEMP_INICIAL)
    const [temperatura, setTemperatura] = useState(TEMP_INICIAL)
    const [rotacao, setRotacao] = useState(ROTACAO_INICIAL)
    const [ph, setPH] = useState(6.5)

    useEffect(() => {
        setRunning(start)
    }, [start])

    const finish = () => {
        setMostura(0)
        setTime(0)
        onFinish(true)
    }

    useInterval(() => {
        if (running) {
            setTime(time + 0.5)

            setMostura(parseInt(Math.min(time, 100)))

            if (time % 1 === 0) {
                setAgua(
                    random(sliderAgua, 0.015, 3)
                )
                setRotacao(
                    random(sliderRotacao, 0.03, 3)
                )
                setTemperatura((
                    (interpolation(0, ROTACAO_INICIAL, 100, 120, rotacao) / 2) +
                    (interpolation(0, TEMP_INICIAL, 20, 120, agua) / 2))
                    .toFixed(1)
                )
                setPH(
                    interpolation(0, TEMP_INICIAL, 6.0, 6.5, agua)
                )
            }

            if (mostura === 100) {
                setRunning(false)
            }
        }
    }, 100);

    return (
        <Panel header="Mostura" bordered>
            <span>Progresso ({parseInt(mostura / 100 * DURACAO)}min de {DURACAO}min)</span>
            <Line percent={mostura} status={mostura === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Temperatura da agua</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={40}
                onChange={value => setSliderAgua(value)}
            />
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${agua} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
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
            <span>Temperatura da mostura</span>
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
                color={mostura === 100 ? 'green' : null}
                onClick={finish}
                disabled={mostura !== 100}
                block>
                Valvula para tanque de Clarificacao
            </IconButton>
        </Panel>
    );
}