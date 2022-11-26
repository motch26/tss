<?php
include("./includes/conn.php");
if (isset($_POST['guidance'])) {
  extract($_POST);
  $update = $conn->exec("UPDATE guidancerequests SET updateMessage = '$updatedMessage', schedule = '$updatedDateTime' WHERE id = $id");
  echo $update;
} else {

  extract($_POST);

  $update = $conn->exec("UPDATE requests SET status = '$updatedStatus', message = '$updatedMessage', scheduleDate = '$updatedDateTime' WHERE id = $id");
  $update2 = $conn->exec("INSERT INTO updates (requestId, action) VALUES($id, '$updatedStatus') ");
  echo $update;
}
