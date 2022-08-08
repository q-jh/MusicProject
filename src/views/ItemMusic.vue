<template>
     <div>
         <ItemMusicTop :playlist="playlist"></ItemMusicTop>
         <ItemMusicList :musicallitems="musicallitems" :subscribedCount="playlist.subscribedCount"></ItemMusicList>
     </div>

     
</template>

<script>
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemMusicList from '@/components/item/ItemMusicList'
import {getMusicList,getMusicAllItem} from '@/request/item'
export default {
    name:'ItemMusic',
    data(){
        return{
            playlist:{},
            musicallitems:{}
            
        }
    },
    components:{ItemMusicTop,ItemMusicList},
    mounted(){
        this.getMusicItem(),
        this.getMusicAllItem()
    },
    methods:{
        async getMusicItem(){
            let result = await getMusicList(this.$route.query.id)
            if(result.status==200){
                this.playlist = result.data.playlist
                // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
                sessionStorage.setItem('itemDetail',JSON.stringify(this.playlist))
            }
        },
        async getMusicAllItem(){
            let result2 = await getMusicAllItem(this.$route.query.id)
            if(result2.status==200){
                this.musicallitems = result2.data.songs
            }
        }
    }
    

}
</script>

<style>

</style>