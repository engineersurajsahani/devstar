<script>
  import { Tabs, TabItem } from "flowbite-svelte";
  import Csstoolkitwave from "$lib/csstoolkitwave.svelte";
  import Csstoolkitstripes from "$lib/csstoolkitstripes.svelte";
  import Csstoolkitgradient from "$lib/csstoolkitgradient.svelte";
  //   let textColor = "#000000"; // Default color

  //   function handleColorChange(event) {
  //     textColor = event.target.value;
  //   }
</script>

<div class="overflow-auto max-w-[1200px]">
  <Tabs>
    <TabItem open title="wave">
      <Csstoolkitwave></Csstoolkitwave>
    </TabItem>
    <TabItem title="Stripes">
      <Csstoolkitstripes></Csstoolkitstripes>
    </TabItem>
    <TabItem title="gradient"><Csstoolkitgradient></Csstoolkitgradient></TabItem
    >
  </Tabs>
</div>
