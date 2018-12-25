/* 用法说明
    <TabBar tabNames={['商品','股指外汇','LME金属']} tabTap={(classifyName)=>{...}}/>
    通过 classifyName 判断点击的是哪个tab；classifyName是回调参数，与tabNames输入的数组下标保持一致。
*/

import React, { PureComponent, Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import PropsTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get('window').width;
const THEME_COLOR = 'white';
const CONTAINER_BORDER_COLOR = '#909090';
const NORMAL_TEXT_COLOR = '#909090';
const ITEM_HIGHLIGHT_COLOR = 'rgb(0,122,204)';
const ITEM_MARGIN_HOR = 5;
const ITEM_MARGIN_VER = 2;

class Item extends PureComponent {
    static propTypes = {
        keyValue: PropsTypes.number,
        highlightIndex: PropsTypes.number,
        itemTitle: PropsTypes.string,
        itemTap: PropsTypes.func,
    }
    state = {
        isHighLight: false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.highlightIndex === nextProps.keyValue) {
            return { isHighLight: true }
        } else {
            return { isHighLight: false }
        }
    }
    _itemPress = () => {
        if (this.state.isHighLight) { return }
        this.props.itemTap(this.props.keyValue);
    }
    render() {
        let itemStyle = this.state.isHighLight ? styles.itemContainerHighlight : null;
        let textStyle = this.state.isHighLight ? styles.itemTextHighlight : null;
        return (
            <TouchableHighlight style={[styles.itemContainer, itemStyle]} onPress={this._itemPress} underlayColor={'transparent'}>
                <Text style={[styles.itemText, textStyle]}>{this.props.itemTitle}</Text>
            </TouchableHighlight>
        );
    }
}
export default class TabBar extends PureComponent {
    static propTypes = {
        tabNames: PropsTypes.array,
        tabTap: PropsTypes.func
    }

    state = {
        highlightIndex: 0
    }

    _itemTap = (keyValue) => {
        let oldstate = this.props.tabNames[this.state.highlightIndex];
        this.setState({ highlightIndex: keyValue });
        this.props.tabTap(this.props.tabNames[keyValue], oldstate);
    }

    itemsGenerator = (tabNames) => {
        let items = [];
        tabNames.forEach((item, index) => {
            items.push(
                <Item
                    key={index}
                    keyValue={index}
                    highlightIndex={this.state.highlightIndex}
                    itemTitle={item}
                    itemTap={this._itemTap}
                />
            );
        });
        return items;
    }

    render() {
        let items = this.itemsGenerator(this.props.tabNames);
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {items}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: DEVICE_WIDTH,
        borderBottomColor: CONTAINER_BORDER_COLOR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: THEME_COLOR
    },
    itemContainer: {
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: ITEM_MARGIN_VER,
        marginHorizontal: ITEM_MARGIN_HOR
    },
    itemText: {
        color: NORMAL_TEXT_COLOR
    },
    itemContainerHighlight: {
        marginBottom: ITEM_MARGIN_VER - 2,
        borderBottomColor: ITEM_HIGHLIGHT_COLOR,
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    itemTextHighlight: {
        color: ITEM_HIGHLIGHT_COLOR
    },
});