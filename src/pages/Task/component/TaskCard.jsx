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
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
        </View>

        {/* Date */}
        {item?.status !== "completed" && item?.status !== "deleted" && (
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Expires On: </Text>
            <View style={[styles.iconview]}>
              <FontAwesome name="calendar-check-o" size={10} color={color} />
              <Text style={[styles.badgeText, { color }]}>
                {moment(item.to_date).format("MMM D, YYYY")}
              </Text>
            </View>
          </View>
        )}

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

        {/* Bottom Info Section */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Created by: </Text>
            <View style={[styles.iconview]}>
              <FontAwesome6 name="user-tie" size={10} color={color} />
              <Text style={[styles.badgeText, { color }]}>
                {item.createdBy?.full_name?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Created on: </Text>

            <View style={[styles.iconview]}>
              <FontAwesome name="calendar-check-o" size={10} color={color} />
              <Text style={[styles.badgeText, { color }]}>
                {moment(item.createdAt).format("MMM D, YYYY")}
              </Text>
            </View>
          </View>

          {["completed", "in-progress", "deleted"].includes(item?.status) && (
            <>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>
                  {item?.status === "completed"
                    ? "Completed by:"
                    : item?.status === "in-progress"
                    ? "Updated by:"
                    : "Deleted by:"}
                </Text>

                <View style={styles.iconview}>
                  <FontAwesome6 name="user-tie" size={10} color={color} />
                  <Text style={[styles.badgeText, { color }]}>
                    {item?.statusUpdatedBy?.full_name?.toUpperCase() ||
                      "Unknown"}
                  </Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>
                  {item?.status === "completed"
                    ? "Completed On:"
                    : item?.status === "in-progress"
                    ? "Updated On:"
                    : "Deleted On:"}
                </Text>

                <View style={styles.iconview}>
                  <FontAwesome
                    name="calendar-check-o"
                    size={10}
                    color={color}
                  />
                  <Text style={[styles.badgeText, { color }]}>
                    {moment(item.statusUpdatedAt).format("MMM D, YYYY")}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
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
  iconview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500"
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
  },
  metaContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 4
  },
  metaLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    width: 100
  },
  metaValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    flexShrink: 1
  }
});
