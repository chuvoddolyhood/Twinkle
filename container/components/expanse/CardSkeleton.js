import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Image } from 'react-native-svg'
import assets from '../../assets/img'
import colors from '../../assets/colors'

const CardSkeleton = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SkeletonPlaceholder borderRadius={4} backgroundColor={colors.backgroundIcon} highlightColor={colors.iconColor} >
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <SkeletonPlaceholder.Item width={80} height={80} borderRadius={70} />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item width={150} height={20} />
                        <SkeletonPlaceholder.Item marginTop={6} width={100} height={20} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item marginTop={10}>
                    <SkeletonPlaceholder.Item >
                        <SkeletonPlaceholder.Item width={250} height={20} />
                        <SkeletonPlaceholder.Item marginTop={6} width={250} height={20} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item marginTop={6} width={250} height={220} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

export default CardSkeleton