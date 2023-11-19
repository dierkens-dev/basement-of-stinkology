import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

export const bosNetwork = new gcp.compute.Network("bos-network", {
  name: pulumi.interpolate`bos-network-${pulumi.getStack}`,
});

new gcp.compute.Firewall("bos-firewall", {
  network: bosNetwork.name,
  allows: [
    {
      protocol: "tcp",
      ports: ["80", "8080", "443", "2525"],
    },
  ],
});
