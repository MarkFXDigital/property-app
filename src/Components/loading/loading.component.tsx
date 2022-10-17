import { ActivityIndicator, View } from 'react-native'
import { loadingEffectStyle } from './loadingEffect.styles'
import { LoadingState } from '../../store/loading/LoadingState'
import { connect } from 'react-redux'
import { store } from '../../store/store'

interface LoadingComponentProps {
    loadingState: LoadingState
}

function LoadingComponent(props: LoadingComponentProps): any {
    return props.loadingState.show ? (
        <View style={loadingEffectStyle.backdrop} testID="loadingComponent">
            <ActivityIndicator animating={true} color="white" />
        </View>
    ) : null
}

const mapStateToProps = (store: {
    loading: LoadingState
}): LoadingComponentProps => ({
    loadingState: store.loading,
})

export default connect(mapStateToProps)(LoadingComponent)
