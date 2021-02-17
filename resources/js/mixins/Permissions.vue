<script>
export default {
  methods: {
    $can(permissionName) {
      return Permissions.indexOf(permissionName) !== -1 || Permissions.find((permission) => permissionName.startsWith(permission)).length;
    },
  },
};
</script>
