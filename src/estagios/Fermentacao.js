import React, { useState, useEffect } from 'react';
import { Panel, Progress, IconButton, Icon, Button, Slider } from 'rsuite'
import { useInterval, random, interpolation } from './utils'

export const Fermentacao = ({ id, start, onFinish }) => {

    const DURACAO = 140
    const TEMP_INICIAL = 18.0
    const ACUCAR_INICIAL = 10.0 // de 8 a 15

    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [fermentacao, setFermentacao] = useState(0)
    const [running, setRunning] = useState(false)

    const [sliderTemperatura, setSliderTemperatura] = useState(TEMP_INICIAL)

    const [temperatura, setTemperatura] = useState(TEMP_INICIAL)
    const [acucar, setAcucar] = useState(ACUCAR_INICIAL)
    const [pH, setPH] = useState(6.5)

    const [estoque, setEstoque] = useState('Estoque')

    useEffect(() => {
        if (start) tripToStock()
    }, [start])

    const tripToStock = () => {
        setEstoque('Em transito')
        setTimeout(() => setEstoque('Fermentacao'), random(4000, 0.1, 3))
        setTimeout(() => setRunning(true), random(4500, 0.1, 3))
        setTimeout(() => setEstoque('Em transito'), random(6000, 0.1, 3))
        setTimeout(() => setEstoque('Estoque'), random(10000, 0.1, 3))
    }

    const finish = () => {
        setFermentacao(0)
        setTime(0)
        onFinish(true)
    }

    useInterval(() => {
        if (running) {
            setTime(time + 0.05)

            setFermentacao(parseInt(Math.min(time, 100)))

            if (time % 0.1 < 0.05) {
                setTemperatura(
                    random(sliderTemperatura, 0.02, 4)
                )
                setPH(
                    interpolation(0, TEMP_INICIAL, 6, 7, temperatura)
                )
                setAcucar(
                    interpolation(0, TEMP_INICIAL, 8, 10, temperatura)
                )
            }

            if (fermentacao === 100) {
                setRunning(false)
            }
        }
    }, 100);

    return (
        <Panel header={`Fermentacao #${id}`} bordered>
            <Button appearance="ghost" color='yellow' block>{estoque}</Button>
            <br />
            <span>Progresso ({parseInt(fermentacao / 100 * DURACAO)}hrs de {DURACAO}hrs)</span>
            <Line percent={fermentacao} status={fermentacao === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Temperatura da cerveja</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={18}
                onChange={value => setSliderTemperatura(value)}
            />
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${temperatura} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>pH</span>
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${pH}` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Denssimetro</span>
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${acucar} oP` : 'Sem leitura'}</Button>
            <br />
            <br />
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={fermentacao === 100 ? 'green' : null}
                onClick={finish}
                disabled={fermentacao !== 100}
                block>
                Valvula para Envase
            </IconButton>
        </Panel>
    );
}