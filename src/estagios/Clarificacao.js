import React, { useState, useEffect } from 'react';
import { Panel, Progress, IconButton, Icon, Button, Slider } from 'rsuite'
import { useInterval, random, interpolation } from './utils'

export const Clarificacao = ({ start, onFinish }) => {

    const DURACAO = 60
    const TEMP_INICIAL = 77.0
    const ROTACAO_INICIAL = 60.0

    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [clarificacao, setClarificacao] = useState(0)
    const [running, setRunning] = useState(false)

    const [sliderAgua, setSliderAgua] = useState(TEMP_INICIAL)
    const [sliderRotacao, setSliderRotacao] = useState(ROTACAO_INICIAL)

    const [agua, setAgua] = useState(TEMP_INICIAL)
    const [temperatura, setTemperatura] = useState(TEMP_INICIAL)
    const [rotacao, setRotacao] = useState(ROTACAO_INICIAL)
    const [bagaco, setBagaco] = useState(false)

    useEffect(() => {
        setRunning(start)
    }, [start])

    const finish = () => {
        setClarificacao(0)
        setTime(0)
        onFinish(true)
    }

    useInterval(() => {
        if (running) {
            setTime(time + 0.5)

            setClarificacao(parseInt(Math.min(time, 100)))

            if (time % 1 === 0) {
                setAgua(
                    random(sliderAgua, 0.02, 3)
                )
                setRotacao(
                    random(sliderRotacao, 0.03, 3)
                )
                setTemperatura((
                    (interpolation(0, ROTACAO_INICIAL, 100, 120, rotacao) / 2) +
                    (interpolation(0, TEMP_INICIAL, 80, 200, agua) / 2))
                    .toFixed(1)
                )
            }

            if (clarificacao === 90) {
                setBagaco(true)
            }

            if (clarificacao === 100) {
                setRunning(false)
                setBagaco(false)
            }
        }
    }, 100);

    return (
        <Panel header="Clarificacao" bordered>
            <span>Progresso ({parseInt(clarificacao / 100 * DURACAO)}min de {DURACAO}min)</span>
            <Line percent={clarificacao} status={clarificacao === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Temperatura da agua</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={77}
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
            <span>Temperatura do mosto</span>
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${temperatura} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Bomba para retirar bagaco</span>
            <Button appearance="ghost" color={bagaco ? 'green' : 'red'}> {bagaco ? 'Ligado' : 'Desligado'}</Button>
            <br />
            <br />
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={clarificacao === 100 ? 'green' : null}
                onClick={finish}
                disabled={clarificacao !== 100}
                block>
                Valvula para tanque de Fervura
            </IconButton>
        </Panel>
    );
}