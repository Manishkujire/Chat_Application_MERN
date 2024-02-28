
export default function unreadNotificationFunc(notifications) {
  console.log("notifications",notifications)
  return notifications.filter((n)=>n.isRead==false)
}
