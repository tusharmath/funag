/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import ReactDOM from 'react-dom'
import 'file?name=[hash].manifest.[ext]!./manifest.json'
import Main from './components/main/main'

ReactDOM.render(<Main/>, document.getElementById('container'))
