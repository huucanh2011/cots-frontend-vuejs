import Vue from 'vue'
import Vuex from 'vuex'

import authentication from '@/store/modules/authentication'
import role from '@/store/modules/role'
import location from '@/store/modules/location'
import post from '@/store/modules/post'
import comment from '@/store/modules/comment'
import user from '@/store/modules/user'
import partner from '@/store/modules/partner'
import rating from '@/store/modules/rating'
import home from '@/store/modules/home'
import imagelocation from '@/store/modules/imagelocation'
import imagepost from '@/store/modules/imagepost'
import decentralization from '@/store/modules/decentralization'
import tour from '@/store/modules/tour'
import tourorder from '@/store/modules/tourorder'
import datedeparture from '@/store/modules/datedeparture'
import tourcategory from '@/store/modules/tourcategory'
import alltour from '@/store/modules/alltour'
import search from '@/store/modules/search'
import dashboard from '@/store/modules/dashboard'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//export
export default new Vuex.Store({
    modules: {
        authentication,
        role,
        location,
        post,
        comment,
        user,
        partner,
        rating,
        home,
        imagelocation,
        imagepost,
        decentralization,
        tour,
        tourorder,
        datedeparture,
        tourcategory,
        alltour,
        search,
        dashboard
    },

    strict: debug
})