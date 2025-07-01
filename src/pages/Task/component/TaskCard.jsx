import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme
} from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// Status colors and icons
const statusMeta = {
  pending: { color: "#FFA500", icon: "hourglass-empty" },
  completed: { color: "#4CAF50", icon: "check-circle" },
  "in-progress": { color: "#2196F3", icon: "loop" },
  deleted: { color: "#F44336", icon: "cancel" },
  default: { color: "#9E9E9E", icon: "info" }
};

const TaskCard = ({ item, handleDelete, onPress, disbled }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { color, icon } =
    statusMeta[item.status?.toLowerCase()] || statusMeta.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disbled}
      activeOpacity={0.9}
      style={[
        styles.card,
        { backgroundColor: isDark ? "#1E1E1E" : "#fff", borderLeftColor: color }
      ]}
    >
      <View style={styles.content}>
        {/* Title */}
        <Text
          style={[styles.title, isDark && { color: "#fff" }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        {/* Description */}
        <Text
          style={[styles.description, isDark && { color: "#ccc" }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {/* Status Badge */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[styles.badge, { backgroundColor: color + "22" }]}>
            <MaterialIcons name={icon} size={14} color={color} />
            <Text style={[styles.badgeText, { color }]}>
              {item.status?.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.badge]}>
            <FontAwesome6 name="user-tie" size={14} color={color} />
            <Text style={[styles.badgeText, { color }]}>
              {item.createdBy?.full_name?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.dateRow}>
          <MaterialIcons name="event" size={16} color={color} />
          <Text style={styles.dateLabel}>Due: </Text>
          <Text style={[styles.dateText, { color }]}>
            {moment(item.to_date).format("MMM D, YYYY")}
          </Text>
        </View>

        {/* Example Assigned User Avatars (with initials) */}
        {/* {item.userIds?.length > 0 && (
          <View style={styles.avatarRow}>
            {item.userIds.slice(0, 3).map((id, index) => (
              <View
                key={id}
                style={[styles.avatarCircle, { backgroundColor: color }]}
              >
                <Text style={styles.avatarText}>{`U${index + 1}`}</Text>
              </View>
            ))}
            {item.userIds.length > 3 && (
              <Text style={styles.moreUsers}>+{item.userIds.length - 3}</Text>
            )}
          </View>
        )} */}
      </View>

      {/* Delete Icon */}
      {item?.status === "pending" && (
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <MaterialIcons name="delete" size={22} color="#FF5252" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    position: "relative"
  },
  content: {
    flex: 1,
    paddingRight: 36
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    gap: 6
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600"
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateLabel: {
    fontSize: 13,
    color: "#444",
    marginLeft: 6
  },
  dateText: {
    fontSize: 13,
    // color: "#4A90E2",
    fontWeight: "500",
    marginLeft: 2
  },
  deleteBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 6,
    backgroundColor: "#555",
    borderRadius: 100
  },
  avatarRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 6,
    alignItems: "center"
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold"
  },
  moreUsers: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600"
  }
});
