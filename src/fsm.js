class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined) throw new Error("Config is empty");
        this._config = config;
        this._activeState = this._config.initial;
        this._nextState = null;
        this._prevState = null;
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._activeState;
    }
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let states = [];
        for (let item in this._config.states) {
            states.push(item);
        }
        if (states.includes(state)) {
            this._prevState = this._activeState;
            this._activeState = state;
            this._nextState = null;

        } else {
            throw new Error("State isn't exist");
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this._config.states[this._activeState].transitions[event] === undefined) {
            throw new Error();
        } else {
            this._prevState = this._activeState;
            this._activeState = this._config.states[this._activeState].transitions[event];
            this._nextState = null;
        }
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._activeState = this._config.initial;
        this._nextState = false;
        this._prevState = false;
    }
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if (event === undefined) {
            for (let item in this._config.states) {
                states.push(item);
            }
        } else if (event) {
            for (let item in this._config.states) {
                if (this._config.states[item].transitions[event])
                    states.push(item);
            }
        }
        return states;
    }
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._activeState == "normal") {
            return false;
        }
        if (this._prevState) {
            this._nextState = this._activeState;
            this._activeState = this._prevState;
            this._prevState = null;
            return true;
        } else {
            return false;
        }
    }
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._nextState == null) {
            return false;
        } else if (this._nextState) {
            this._previousState = this._activeState;
            this._activeState = this._nextState;
            this._nextState = null;
            return true;
        }
    }
    /**
     * Clears transition history
     */
    clearHistory() {
        this._prevState = null;
        this._nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/