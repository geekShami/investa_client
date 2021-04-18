<template>
    <div v-if="isSelected">
        <slot></slot>
    </div>
</template>

<script>

export default{
    name: "TabItem",
    props:{
        isSelected:{
            type: Boolean
        }
    }
}
</script>
