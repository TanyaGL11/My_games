/* eslint-disable array-callback-return */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-unused-vars */
import React from 'react'
import './style.module.css'

const defaultParams = {
    fieldWidth: 600,
    fieldHeight: 600,
    targetWidth: 60,
    targetHeight: 60,
    fieldColor: '#fff',
    targetColor1: '#df9e51',
    targetColor2: '#bf3a36',
    targetShadow1: '0px 0px 22px 2px #845216',
    targetShadow2: '0px 0px 22px 2px #730c0c',
    targetBorderRadius1: '100%',
    probability: 50,
    periodMsec: 650,
    periodForClickMsec: 950,
    difficultStepMsec: 7,
    difficultStepProbability: 4,
    difficultIntervalMsec: 1200,
    lifes: 4, //from 0
}

const initialGameState = () => ({
    targets: [],
    probability: defaultParams.probability,
    life: defaultParams.lifes + 1,
    score: 0
})
const gameField = {
    width: defaultParams.fieldWidth + 'px',
    height: defaultParams.fieldHeight + 'px',
    backgroundColor: defaultParams.fieldColor,
    cursor: 'crosshair',
    position: 'relative',
}

const panelStyle = {
    textAlign: 'center',
    fontSize: '30px',
    color: 'rgb(9, 157, 190)',
    backgroundColor: defaultParams.fieldColor,
    paddingTop: '40px',
    paddingBottom: '30px',
    marginTop: '60px',
}

const messageStyle = {
    textAlign: 'center',
    fontSize: '43px',
    paddingTop: '65px',
    color: 'rgb(9, 157, 190)',
}    

let gameParams = {...defaultParams}
class Target extends React.Component {

    tooLate = setTimeout(
        () => {
            this.setState({ fired: true })
            this.props.targetFired()
        },
        defaultParams.periodForClickMsec
    )

    clearTimeout = () => {
        clearTimeout(this.tooLate)
        return true
    }

    constructor(props) {
        super(props)
        this.state = { fired: false }
    }

    render() {
        return (
            <div
                onClick={
                    () => {
                        !this.state.fired
                            && this.clearTimeout()
                            && this.props.clickHandler(this.props.id)
                    }
                }
                style={makeTargetStyle({ ...this.props.coordinate, fired: this.state.fired })}
            />
        )
    }
}
const makeTargetStyle = ({ xpos, ypos, fired }) => {
    return {
        width: defaultParams.targetWidth,
        height: defaultParams.targetHeight,
        backgroundColor: fired ? defaultParams.targetColor2 : defaultParams.targetColor1,
        boxShadow: fired ? defaultParams.targetShadow2 : defaultParams.targetShadow1,
        borderRadius: defaultParams.targetBorderRadius1,
        position: 'absolute',
        top: ypos,
        left: xpos,
    }
}


class Bxnotes extends React.Component {

    runNewGame = () => {
        this.setState({ ...initialGameState(), gameover: false, start: true, targetsCnt: 0 })
        this.makeGameFlow(this.gameOptions())
    }

    gameOptions = () => ({
        probability: this.state.probability,
        periodMsec: gameParams.periodMsec,
    })

    makeGameFlow = (options) => {
        if (this.state.life === 0) {
            gameParams = { ...defaultParams }
            const score = this.state.score
            this.setState({ ...initialGameState(), gameover: true, lastscore: this.state.score })
            return false
        }
        let gameIterator = this.targetGenerate(options)
        setTimeout(
            () => {
                clearInterval(gameIterator)
                options.periodMsec -= gameParams.difficultStepMsec
                options.probability += gameParams.difficultStepProbability
                this.makeGameFlow(options, this)
            },
            gameParams.difficultIntervalMsec
        )
    }

    targetGenerate = ({ probability, periodMsec }) => {
        return setInterval(() => {
            if (Math.random() * 100 <= probability) {
                const xpos = Math.random() * (gameParams.fieldWidth - gameParams.targetWidth)
                const ypos = Math.random() * (gameParams.fieldHeight - gameParams.targetHeight)
                this.setState({
                    targets: [
                        ...this.state.targets,
                        <Target
                            id={this.state.targetsCnt}
                            key={this.state.targetsCnt}
                            coordinate={{ xpos, ypos }}
                            clickHandler={this.clickTarget}
                            targetFired={this.targetFired}
                        />
                    ],
                    targetsCnt: ++ this.state.targetsCnt
                })
            }
        }, periodMsec)
    }

    clickTarget = (id) => {
        const _targets = [...this.state.targets]
        _targets.reduce(
            (acc, curr, i, arr) => {
                if (curr.props.id === id) {
                    arr.splice(i, 1)
                    this.setState({
                        score: ++ this.state.score,
                        targets: _targets
                    })
                }
            },
            _targets[0]
        )
    }

    targetFired = () => {
        const life = this.state.life > 0
            ? this.state.life - 1
            : 0
        this.setState({ life: life })
    }

    constructor(props) {
        super(props)
        this.state = { ...initialGameState(), start: false }
    }

    render() {
        return (
            <div>
                  <div style={panelStyle}>
                    {this.state.gameover !== true
                        && this.state.start === true
                        && `Попыток осталось: ${this.state.life} Попаданий: ${this.state.score}`
                    }
                </div>
                <div className="game-field" style={gameField}>

                    {
                        this.state.start === false
                        && <div
                            style={messageStyle}
                            onClick={() => this.runNewGame()}
                        >
                            <span style={{ cursor: 'pointer' }}>Начать новую игру</span>
                        </div>
                    }

                    {
                        this.state.gameover === true
                        && <div style={messageStyle}>
                            <div>Мишеней сбито: {this.state.lastscore}</div>
                            <div onClick={() => this.runNewGame()}>
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                    Играть еще
                                </span>
                            </div>
                        </div>
                    }

                    {this.state.targets}

                </div>
            </div>
        )
    }
}

export default Bxnotes 