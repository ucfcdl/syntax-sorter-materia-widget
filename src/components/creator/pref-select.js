import React, { useContext } from 'react'
import { store } from '../../creator-store'

const PrefSelect = (props) => {

	const global = useContext(store)
	const dispatch = global.dispatch

	const currentPref = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].displayPref : 'word'
	const currentFakeoutPref = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].fakeoutPref : 'no'
	const currentFakeout = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].fakeout : ''
	const currentCheckPref = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].checkPref : 'no'
  const currentNumChecks = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].numChecks : 1
  const currentHint = global.state.items[global.state.currentIndex] ? global.state.items[global.state.currentIndex].hint : ''

	const handleTokenDisplayPref = (event) => {
		dispatch({type: 'update_display_pref', payload: {
			questionIndex: global.state.currentIndex,
			pref: event.target.value
		}})
	}

	const handleFakeoutPref = (event) => {
		dispatch({type: 'update_fakeout_pref', payload: {
			questionIndex: global.state.currentIndex,
			pref: event.target.value
		}})
	}

	const handleFakeout = (event) => {
		dispatch({type: 'update_fakeout', payload: {
			questionIndex: global.state.currentIndex,
			pref: event.target.value
		}})
	}

	const toggleHintModal = () => {
    dispatch({type: 'toggle_hint_modal'})
  }

  const toggleFakeoutModal = () => {
    dispatch({type: 'toggle_fakeout_modal'})
  }

	return (
		<div className="pref-holder">
			<div className="card pref-card">
				<div className="pref-options">
					<header>How should each token be displayed to students?</header>
					<span className="pref-select">
						<input type="radio" name="token-display-select" value={"word"} onChange={handleTokenDisplayPref} checked={currentPref == 'word'}/>
						<span className={`radio-overlay ${currentPref == 'word' ? 'selected' : ''}`}></span>
						Word
					</span>
					<span className="pref-select">
						<input type="radio" name="token-display-select" value={"part-of-speech"} onChange={handleTokenDisplayPref} checked={currentPref == 'part-of-speech'}/>
						<span className={`radio-overlay ${currentPref == 'part-of-speech' ? 'selected' : ''}`}></span>
						Part of Speech
					</span>
				</div>
			</div>
			<div className="pref-spacer"></div>
			<div className="options-holder">
				<div className="card more-card" onClick={toggleHintModal}>
					<p>Set Guess Limits and Hints</p>
					<p className={`guess-limit-tip ${currentCheckPref == "yes" ? "show" : ""}`} >Guess limit: {currentNumChecks}, hint: {currentHint.length > 0 ? "enabled" : "disabled"}</p>
				</div>
				<div className="options-spacer"></div>
				<div className="card more-card" onClick={toggleFakeoutModal}>
					<p>Add "Fake" Tokens</p>
					<p className={`guess-limit-tip ${currentFakeoutPref == "yes" ? "show" : ""}`} >Fake Tokens: {currentFakeout.length}</p>
				</div>
			</div>
		</div>
	)
}

export default PrefSelect
