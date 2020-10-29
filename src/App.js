import React, { useState } from 'react';
import { Row, Col, Grid } from 'rsuite'

import { Moagem } from './estagios/Moagem'
import { Mostura } from './estagios/Mostura'
import { Clarificacao } from './estagios/Clarificacao'
import { Fervura } from './estagios/Fervura'
import { Whirpool } from './estagios/Whirpool'
import { Fermentacao } from './estagios/Fermentacao'
import { Envase } from './estagios/Envase'

import 'rsuite/dist/styles/rsuite-dark.css'
import './index.css'

function App() {

    const [onMoagemFinish, setOnMoagemFinish] = useState(false)
    const [onMosturaFinish, setOnMosturaFinish] = useState(false)
    const [onClarificacaoFinish, setOnClarificacaoFinish] = useState(false)
    const [onFervuraFinish, setOnFervuraFinish] = useState(false)
    const [onWhirpool1Finish, setOnWhirpool1Finish] = useState(false)
    const [onWhirpool2Finish, setOnWhirpool2Finish] = useState(false)
    const [onWhirpool3Finish, setOnWhirpool3Finish] = useState(false)
    const [onFermentacao1Finish, setOnFermentacao1Finish] = useState(false)
    const [onFermentacao2Finish, setOnFermentacao2Finish] = useState(false)
    const [onFermentacao3Finish, setOnFermentacao3Finish] = useState(false)

    return (
        <Grid fluid>
            <Row>
                <Col lg={8} md={12}>
                    <Moagem onFinish={setOnMoagemFinish} />

                    <Fervura
                        start={onClarificacaoFinish}
                        onFinish={value => {
                            setOnFervuraFinish(value)
                            setOnClarificacaoFinish(false)
                        }}
                    />

                    <Fermentacao
                        id={1}
                        start={onWhirpool1Finish}
                        onFinish={value => {
                            setOnFermentacao3Finish(value)
                            setOnWhirpool1Finish(false)
                        }}
                    />

                    <Fermentacao
                        id={2}
                        start={onWhirpool2Finish}
                        onFinish={value => {
                            setOnFermentacao1Finish(value)
                            setOnWhirpool2Finish(false)
                        }}
                    />
                </Col>

                <Col lg={8} md={12}>
                    <Mostura
                        start={onMoagemFinish}
                        onFinish={value => {
                            setOnMosturaFinish(value)
                            setOnMoagemFinish(false)
                        }}
                    />

                    <Whirpool
                        start={onFervuraFinish}
                        onFinish1={value => {
                            setOnWhirpool1Finish(value)
                            setOnFervuraFinish(false)
                        }}
                        onFinish2={value => {
                            setOnWhirpool2Finish(value)
                            setOnFervuraFinish(false)
                        }}
                        onFinish3={value => {
                            setOnWhirpool3Finish(value)
                            setOnFervuraFinish(false)
                        }}
                    />

                    <Fermentacao
                        id={3}
                        start={onWhirpool3Finish}
                        onFinish={value => {
                            setOnFermentacao2Finish(value)
                            setOnWhirpool3Finish(false)
                        }}
                    />
                </Col>

                <Col lg={8} md={12}>
                    <Clarificacao
                        start={onMosturaFinish}
                        onFinish={value => {
                            setOnClarificacaoFinish(value)
                            setOnMosturaFinish(false)
                        }}
                    />

                    <Envase
                        start={onFermentacao1Finish || onFermentacao2Finish || onFermentacao3Finish}
                        onFinish={value => {
                            setOnFermentacao1Finish(false)
                            setOnFermentacao2Finish(false)
                            setOnFermentacao3Finish(false)
                        }}
                    />
                </Col>
            </Row>
        </Grid>
    );
}

export default App;
