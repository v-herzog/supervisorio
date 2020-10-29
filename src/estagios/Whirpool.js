import React, { useState, useEffect } from 'react';
import { Panel, Progress, IconButton, Icon, Button, Slider } from 'rsuite'
import { useInterval, random, interpolation } from './utils'

export const Whirpool = ({ start, onFinish1, onFinish2, onFinish3 }) => {

    const DURACAO = 120
    const AGUA_FRIA_INICIAL = 5.0
    const AGUA_QUENTE_INICIAL = 100.0
    const BOMBA_INICIAL = 1000.0

    const { Line } = Progress;

    const [time, setTime] = useState(0)
    const [whirpool, setWhirpool] = useState(0)
    const [running, setRunning] = useState(false)

    const [sliderBomba, setSliderBomba] = useState(BOMBA_INICIAL)
    const [sliderAguaFria, setSliderAguaFria] = useState(AGUA_FRIA_INICIAL)

    const [aguaFria, setAguaFria] = useState(AGUA_FRIA_INICIAL)
    const [aguaQuente, setAguaQuente] = useState(AGUA_QUENTE_INICIAL)
    const [bomba, setBomba] = useState(BOMBA_INICIAL)
    const [turbiquente, setTurbiquente] = useState(false)

    useEffect(() => {
        setRunning(start)
    }, [start])

    const finish = (tank) => {
        setWhirpool(0)
        setTime(0)
        switch (tank) {
            case 1:
                onFinish1(true)
                break
            case 2:
                onFinish2(true)
                break
            case 3:
                onFinish3(true)
                break
            default:
                break
        }
    }

    useInterval(() => {
        if (running) {
            setTime(time + 0.3)

            setWhirpool(parseInt(Math.min(time, 100)))

            if (time % 0.5 < 0.1) {
                setAguaFria(
                    random(sliderAguaFria, 0.02, 3)
                )
                setBomba(
                    random(sliderBomba, 0.1, 5)
                )
                setAguaQuente(
                    interpolation(0, AGUA_FRIA_INICIAL, 90, 110, aguaFria)
                )
            }

            if (whirpool === 50) {
                setTurbiquente(true)
            }

            if (whirpool === 70) {
                setTurbiquente(false)
            }

            if (whirpool === 100) {
                setRunning(false)
                setTurbiquente(false)
            }
        }
    }, 100);

    return (
        <Panel header="Whirpool e Trocador de Calor" bordered>
            <span>Progresso ({parseInt(whirpool / 100 * DURACAO)}min de {DURACAO}min)</span>
            <Line percent={whirpool} status={whirpool === 100 ? 'success' : 'active'} strokeColor="#ffc107" />

            <span>Velocidade da bomba</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={BOMBA_INICIAL}
                max={2000}
                onChange={value => setSliderBomba(value)}
            />
            <Button appearance="ghost" color={running ? 'green' : 'yellow'}> {running ? `${bomba} RPM` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Temperatura da agua fria</span>
            <Slider
                style={{ width: 100 }}
                defaultValue={AGUA_FRIA_INICIAL}
                max={50}
                onChange={value => setSliderAguaFria(value)}
            />
            <Button appearance="ghost" color={running ? 'blue' : 'yellow'}> {running ? `${aguaFria} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Temperatura da agua quente</span>
            <Button appearance="ghost" color={running ? 'red' : 'yellow'}> {running ? `${aguaQuente} oC` : 'Sem leitura'}</Button>
            <br />
            <br />
            <span>Bomba para retirar turbiquente</span>
            <Button appearance="ghost" color={turbiquente ? 'green' : 'red'}> {turbiquente ? 'Ligado' : 'Desligado'}</Button>
            <br />
            <br />
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={whirpool === 100 ? 'green' : null}
                onClick={() => finish(1)}
                disabled={whirpool !== 100}
                block>
                Valvula para tanque de Fermentacao #1
            </IconButton>
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={whirpool === 100 ? 'green' : null}
                onClick={() => finish(2)}
                disabled={whirpool !== 100}
                block>
                Valvula para tanque de Fermentacao #2
            </IconButton>
            <IconButton
                icon={<Icon icon="arrow-right" />}
                placement="right"
                color={whirpool === 100 ? 'green' : null}
                onClick={() => finish(3)}
                disabled={whirpool !== 100}
                block>
                Valvula para tanque de Fermentacao #3
            </IconButton>
        </Panel>
    );
}