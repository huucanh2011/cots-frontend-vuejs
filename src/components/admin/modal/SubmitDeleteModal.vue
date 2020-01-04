<template>
  <div
    class="submit__delete__modal modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">Xác nhận xoá</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Bạn có chắc chắn xoá?</div>
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>