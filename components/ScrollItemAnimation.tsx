import { useRef } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
} from "react-native";
import faker from "faker";

faker.seed(10);

const DUMMY_DATA = [...Array(30).keys()].map((_, i) => {
	return {
		key: faker.datatype.uuid(),
		image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
			"women",
			"men",
		])}/${faker.datatype.number(60)}.jpg`,
		name: faker.name.findName(),
		jobTitle: faker.name.jobTitle(),
		email: faker.internet.email().toLocaleLowerCase(),
	};
});

const { width, height } = Dimensions.get("screen");

const SPACING = 20;
const AVATAR_SIZE = 70;

const CARD_HEIGHT = AVATAR_SIZE + SPACING * 3;

const ScrollItemAnimation = () => {
	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<View style={styles.container}>
			{/* <Image
				source={{ uri: DUMMY_DATA[faker.datatype.number(30)].image }}
				style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
				blurRadius={20}
			/> */}
			<Text style={styles.heading}>Your Connections</Text>
			<Animated.FlatList
				data={DUMMY_DATA}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{
					padding: SPACING,
					paddingTop: 10,
				}}
				renderItem={({ item, index }) => {
					const scaleInputRange = [
						-1,
						0,
						CARD_HEIGHT * index,
						CARD_HEIGHT * (index + 2),
					];

					const scale = scrollY.interpolate({
						inputRange: scaleInputRange,
						outputRange: [1, 1, 1, 0],
					});

					const opacityInputRange = [
						-1,
						0,
						CARD_HEIGHT * index,
						CARD_HEIGHT * (index + 0.5),
					];

					const opacity = scrollY.interpolate({
						inputRange: opacityInputRange,
						outputRange: [1, 1, 1, 0],
					});

					return (
						<Animated.View
							style={[styles.card, { transform: [{ scale }], opacity }]}
						>
							<Image source={{ uri: item.image }} style={styles.avatarImage} />
							<View>
								<Text style={styles.name}>{item.name}</Text>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.jobTitle}
								>
									{item.jobTitle}
								</Text>
								<Text style={styles.email}>{item.email}</Text>
							</View>
						</Animated.View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
		paddingTop: 70,
	},
	heading: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 20,
		textAlign: "center",
	},
	card: {
		flexDirection: "row",
		padding: SPACING,
		marginBottom: SPACING,
		borderRadius: 20,
		backgroundColor: "#F0F5F9",
		// elevation: 22,
		// shadowColor: "rgba(0, 0, 0, .4)",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 10,
		// },
		// shadowOpacity: 0.3,
		// shadowRadius: 20,
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		marginRight: SPACING / 2,
		borderColor: "#fafafa",
		borderWidth: 2,
	},
	name: {
		fontSize: 22,
		fontWeight: "700",
		color: "#000",
	},
	jobTitle: {
		fontSize: 18,
		color: "#010101",
		width: "95%",
	},
	email: {
		fontSize: 12,
		opacity: 0.8,
		color: "#0070F3",
	},
});

export default ScrollItemAnimation;
