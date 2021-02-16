<template>
    <div class="container">
        <div class="row justify-content-around mt-5">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="rounded border shadow p-3">
                    <div class="h2 mb-4 mt-2 text-center">
                        <i class="far fa-fw fa-sun-haze"></i> <span class="fw-bold">Horizon</span>
                    </div>

                    <div v-html="policy" class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['policy'],
}
</script>
