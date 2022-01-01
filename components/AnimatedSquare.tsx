import { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SQUARE_SIZE = 100;

const AnimatedSquare = () => {
	const opacity = useRef(new Animated.Value(0.3)).current;
	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Animated.loop(
			Animated.parallel([
				Animated.sequence([
					Animated.spring(opacity, {
						toValue: 1,
						useNativeDriver: true,
					}),
					Animated.spring(opacity, {
						toValue: 0.3,
						useNativeDriver: true,
					}),
				]),
				Animated.sequence([
					Animated.spring(scale, {
						toValue: 2,
						useNativeDriver: true,
					}),
					Animated.spring(scale, {
						toValue: 1,
						useNativeDriver: true,
					}),
				]),
			]),
			{ iterations: 3 }
		).start();
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.square,
					{
						borderRadius: opacity.interpolate({
							inputRange: [0.3, 1],
							outputRange: [SQUARE_SIZE / 6, SQUARE_SIZE / 2],
						}),
						opacity,
						transform: [
							{ scale },
							{
								rotate: opacity.interpolate({
									inputRange: [0.3, 1],
									outputRange: ["0deg", "45deg"],
								}),
							},
						],
					},
				]}
			></Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	square: {
		width: SQUARE_SIZE,
		height: SQUARE_SIZE,
		backgroundColor: "#F6C90E",
		borderRadius: 15,
	},
});

export default AnimatedSquare;
