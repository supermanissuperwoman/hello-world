<template>
  <div>系统设置</div>
</template>

<script>

export default {
  data() {
    return {};
  },
  created() {
    // let connection = new signalR.HubConnectionBuilder()
    //   .withUrl("http://8.141.63.98:8090/signalr")
    //   .build();
    // console.log(1);
    // connection.on("probeKeepalive", (data) => {
    //   console.log(data);
    // });
    // connection.start()
    // .then(() => connection.invoke("probeKeepalive", "Hello"));
    return;
    $.connection.hub.url = "http://8.141.63.98:8090/signalr";
    var ProbeCommercialConnection = $.connection.ProbeConfigWSSHub;
    ProbeCommercialConnection.client.probeKeepalive = function () {
      console.log("hhh");
    };
  },
};
</script>

<style>
</style>